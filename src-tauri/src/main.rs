// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn get_message() -> String {
    // create a list of messages
    const MESSAGES: [&str; 5] = [
        "Rustic Greetings! 🦀✨",
        "Rust: Fearless Concurrency in Action! 🚀",
        "Climbing the Learning Curve in Rust! 🧗‍♂️",
        "Rust: Where Ideas Compile! ✨💻",
        "Unlocking the Power of Rust! 🔓🦀",
    ];

    // generate a random number between 0 and 4
    let random_number = rand::random::<usize>() % 4;

    // return a random message
    MESSAGES[random_number].to_string()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_message])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
