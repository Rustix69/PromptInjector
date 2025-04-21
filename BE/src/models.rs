use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Deserialize)]
pub struct UserInput {
    pub input: String,
}



#[derive(Debug, Clone, Serialize)]
pub struct DetectionResult {
    pub rules_score: f32,
    pub llm_score: f32,
    pub final_score: f32,
    pub reason: String,
    pub action: String,
}