// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use tauri::{Manager, WindowEvent};

#[tauri::command]
fn toggle_window_visibility(app: tauri::AppHandle) -> Result<(), String> {
    if let Some(window) = app.get_webview_window("main") {
        let is_visible = window.is_visible().map_err(|e| e.to_string())?;
        if is_visible {
            window.hide().map_err(|e| e.to_string())?;
        } else {
            window.show().map_err(|e| e.to_string())?;
            // Unminimize if minimized
            let _ = window.unminimize();
            // Small delay before focus to ensure window is fully visible
            std::thread::sleep(std::time::Duration::from_millis(50));
            window.set_focus().map_err(|e| e.to_string())?;
        }
    }
    Ok(())
}

#[tauri::command]
async fn close_splashscreen(app: tauri::AppHandle) -> Result<(), String> {
    if let Some(main) = app.get_webview_window("main") {
        main.show().map_err(|e| e.to_string())?;
        let _ = main.set_focus();
    }
    if let Some(splash) = app.get_webview_window("splashscreen") {
        let _ = splash.eval(
            "document.body.style.transition='opacity .25s ease';document.body.style.opacity='0';",
        );
        let app_for_close = app.clone();
        std::thread::spawn(move || {
            std::thread::sleep(std::time::Duration::from_millis(280));
            if let Some(splash) = app_for_close.get_webview_window("splashscreen") {
                let _ = splash.hide();
                let _ = splash.close();
            }
        });
    }
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_autostart::Builder::new().build())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .on_window_event(|window, event| {
            if window.label() == "main" {
                if let WindowEvent::CloseRequested { api, .. } = event {
                    api.prevent_close();
                    window.hide().ok();
                }
            }
        })
        .setup(|app| {
            // Tray icon: use the bundled app icon (embedded at build time via tauri.conf.json
            // `bundle.icon`). Works in both dev and production on Windows + macOS.
            use tauri::menu::{Menu, MenuItem};
            use tauri::tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent};

            let open_item = MenuItem::with_id(app, "open", "Open App", true, None::<&str>)?;
            let quit_item = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
            let menu = Menu::with_items(app, &[&open_item, &quit_item])?;

            let mut tray_builder = TrayIconBuilder::with_id("main-tray")
                .tooltip("Tauri Boilerplate - Click to toggle")
                .menu(&menu)
                .show_menu_on_left_click(false)
                .on_menu_event(|app, event| match event.id().as_ref() {
                    "open" => {
                        if let Some(window) = app.get_webview_window("main") {
                            let _ = window.show();
                            let _ = window.unminimize();
                            let _ = window.set_focus();
                        }
                    }
                    "quit" => {
                        app.exit(0);
                    }
                    _ => {}
                })
                .on_tray_icon_event(|tray, event| {
                    // Fire on mouse-up only; otherwise the handler runs twice
                    // (Down + Up) and the show/hide toggle cancels itself out,
                    // which is what made it feel like a double-click was needed.
                    if let TrayIconEvent::Click {
                        button: MouseButton::Left,
                        button_state: MouseButtonState::Up,
                        ..
                    } = event
                    {
                        if let Some(window) = tray.app_handle().get_webview_window("main") {
                            let visible = window.is_visible().unwrap_or(false);
                            let minimized = window.is_minimized().unwrap_or(false);
                            if visible && !minimized {
                                let _ = window.hide();
                            } else {
                                let _ = window.show();
                                let _ = window.unminimize();
                                let _ = window.set_focus();
                            }
                        }
                    }
                });

            if let Some(icon) = app.default_window_icon() {
                tray_builder = tray_builder.icon(icon.clone());
            }

            if let Err(e) = tray_builder.build(app) {
                eprintln!("Failed to create tray icon: {:?}", e);
            }

            // Global shortcut will be handled via Tauri plugin (registered from event listener below)

            // Fallback: if frontend never invokes close_splashscreen, force main visible after 8s
            let handle = app.handle().clone();
            std::thread::spawn(move || {
                std::thread::sleep(std::time::Duration::from_secs(8));
                if let Some(main) = handle.get_webview_window("main") {
                    if !main.is_visible().unwrap_or(true) {
                        let _ = main.show();
                        let _ = main.set_focus();
                    }
                }
                if let Some(splash) = handle.get_webview_window("splashscreen") {
                    let _ = splash.close();
                }
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            close_splashscreen,
            toggle_window_visibility,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
