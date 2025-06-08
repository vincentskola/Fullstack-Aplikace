CREATE TABLE zvirata (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    jmeno TEXT NOT NULL,
    vek INTEGER,
    druh_id INTEGER, -- změněno na druh_id
    opatrovnik_id INTEGER,
    FOREIGN KEY (opatrovnik_id) REFERENCES opatrovnici(id),
    FOREIGN KEY (druh_id) REFERENCES druhy(id) -- přidáno
);

CREATE TABLE opatrovnici (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    jmeno TEXT NOT NULL,
    prijmeni TEXT NOT NULL,
    telefon TEXT
);

CREATE TABLE pece (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    zvirata_id INTEGER NOT NULL,
    opatrovnik_id INTEGER NOT NULL,
    FOREIGN KEY (zvirata_id) REFERENCES zvirata(id),
    FOREIGN KEY (opatrovnik_id) REFERENCES opatrovnici(id)
);

CREATE TABLE druhy (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nazev TEXT NOT NULL
);


