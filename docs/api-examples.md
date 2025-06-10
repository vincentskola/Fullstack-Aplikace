---
outline: deep
---

# API Přehled

Tato stránka stručně popisuje hlavní API endpointy backendu aplikace útulku.

## Základní endpointy

### Zvířata

- `GET /api/zvirata`  
  Vrátí seznam všech zvířat.

- `POST /api/zvirata`  
  Přidá nové zvíře.  
  **Tělo:**  
  ```json
  {
    "jmeno": "Baryk",
    "vek": 3,
    "druh_id": 1,
    "opatrovnik_id": 2,
    "popis": "Přátelský pes, připravený k adopci, apod..."
  }
  ```

### Druhy

- `GET /api/druhy`  
  Vrátí seznam druhů zvířat.

### Pečovatelé

- `GET /api/opatrovnici`  
  Vrátí seznam pečovatelů.

## Ukázka odpovědi

```json
[
  {
    "id": 1,
    "jmeno": "Baryk",
    "vek": 3,
    "druh": "Pes",
    "opatrovnik": "Bořek Novák",
    "popis": "Přátelský pes, vykastrovaný apod."
  }
]
```

---

Více informací najdete v kódu backendu nebo v hlavní dokumentaci projektu.
