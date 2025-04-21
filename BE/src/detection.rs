use crate::rules::rule_based_score;
use crate::llm::llm_score;
use crate::models::DetectionResult;
use tracing::info;

pub async fn detect(input: String) -> DetectionResult {
    let (rule_score, _rule_reason) = rule_based_score(&input);
    let (llm_score, llm_reason) = llm_score(&input).await;

    // You can tune the weights
    let final_score = (rule_score * 0.4) + (llm_score * 0.6);
    
    info!("Score calculation: rule_score={}, llm_score={}, final_score={}", 
          rule_score, llm_score, final_score);

    let action = if final_score > 0.5 { "block" } else { "safe" };

    DetectionResult {
        rules_score: rule_score,
        llm_score,
        final_score,
        reason: format!("{}", llm_reason),
        action: action.to_string(),
    }
}
