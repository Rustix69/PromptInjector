use axum::{Json, routing::post, Router};
use crate::models::{UserInput, DetectionResult};
use crate::detection::detect;

pub fn create_router() -> Router {
    Router::new().route("/check", post(handler))
}

async fn handler(Json(payload): Json<UserInput>) -> Json<DetectionResult> {
    let result = detect(payload.input).await;
    Json(result)
}
