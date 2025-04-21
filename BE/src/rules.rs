use regex::Regex;

pub fn rule_based_score(input: &str) -> (f32, String) {
    let patterns = vec![
        r"(?i)ignore.*previous",
        r"(?i)disregard.*above",
        r"(?i)pretend to",
        r"(?i)act as",
        r"(?i)you are now",
        r"(?i)system:",
        r"(?i)assistant:",
    ];

    let mut score: f32 = 0.0;
    let mut reasons = vec![];

    for pattern in patterns {
        let re = Regex::new(pattern).unwrap();
        if re.is_match(input) {
            score += 0.15;
            reasons.push(format!("Matched: {}", pattern));
        }
    }

    (score.min(1.0), reasons.join("; "))
}
