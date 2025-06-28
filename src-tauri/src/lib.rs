use discord_rpc_client::Client;
use std::time::{SystemTime, UNIX_EPOCH};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn set_activity(details: String, state: String) {
    println!("Set activity command received: {} | {}", details, state);
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    std::thread::spawn(|| {
    

    loop {
        let mut drpc = Client::new(1307731582420910193);
    drpc.start();

    let start_time = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .expect("Time went backwards")
        .as_secs();

    drpc
        .set_activity(|act| {
            act.details("Playing Selaura Client")
                .state("In the Launcher")
                .timestamps(|t| t.start(start_time))
                .assets(|a| a.large_image("app_large_icon"))
        })
        .expect("Failed to set Discord activity");
        
        std::thread::sleep(std::time::Duration::from_secs(10));
    }
});


    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet, set_activity])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
