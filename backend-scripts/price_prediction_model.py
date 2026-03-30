import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from datetime import datetime, timedelta

def predict_prices(price_history: list[dict], days_ahead: int = 7) -> list[dict]:
    """
    Input: price_history = [
        {"date": "2025-03-23", "price": 40.0},
        {"date": "2025-03-24", "price": 42.0},
        {"date": "2025-03-25", "price": 38.0},
        {"date": "2025-03-26", "price": 45.0},
        {"date": "2025-03-27", "price": 43.0},
        {"date": "2025-03-28", "price": 44.0},
        {"date": "2025-03-29", "price": 46.0},
    ]
    Output: predicted prices for next 7 days
    """
    if not price_history:
        return []

    # Feature engineering
    dates = [datetime.strptime(p["date"], "%Y-%m-%d") for p in price_history]
    base_date = min(dates)
    X = np.array([(d - base_date).days for d in dates]).reshape(-1, 1)
    y = np.array([p["price"] for p in price_history])

    # Polynomial regression (degree 2) for capturing trends
    poly = PolynomialFeatures(degree=2)
    X_poly = poly.fit_transform(X)

    model = LinearRegression()
    model.fit(X_poly, y)

    # Predict future
    last_day = max(X)[0]
    future_X = np.array([last_day + i + 1 for i in range(days_ahead)]).reshape(-1, 1)
    future_X_poly = poly.transform(future_X)
    predictions = model.predict(future_X_poly)

    # Build output
    last_date = max(dates)
    results = []
    
    # Calculate R-squared safely
    confidence = 0.0
    try:
        confidence = round(model.score(X_poly, y), 3)
    except:
        pass

    for i, pred in enumerate(predictions):
        future_date = last_date + timedelta(days=i + 1)
        results.append({
            "date": future_date.strftime("%Y-%m-%d"),
            "predicted_price": round(max(pred, 0), 2),  # no negative prices
            "confidence": confidence
        })

    return results

# Example Usage:
if __name__ == "__main__":
    sample_data = [
        {"date": "2026-03-23", "price": 40.0},
        {"date": "2026-03-24", "price": 42.0},
        {"date": "2026-03-25", "price": 38.0},
        {"date": "2026-03-26", "price": 45.0},
        {"date": "2026-03-27", "price": 43.0},
        {"date": "2026-03-28", "price": 44.0},
        {"date": "2026-03-29", "price": 46.0},
    ]
    predictions = predict_prices(sample_data)
    print("Predicted Prices:", predictions)
