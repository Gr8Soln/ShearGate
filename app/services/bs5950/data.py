BS5950_TABLES = {
    "T.30": {
        "title": "Table 30 - Minimum edge and end distances",
        "description": "Validates the minimum acceptable distance from center of bolt to edge.",
        "content": [
            {"condition": "Rolled, machine flame cut, sawn or planed edge", "distance": "1.25 * d"},
            {"condition": "Sheared or hand flame cut edge", "distance": "1.4 * d"}
        ],
        "clause": "6.2.2.4"
    },
    "T.31": {
        "title": "Table 31 - Maximum edge and end distances",
        "description": "Validates the maximum distance to avoid plate separation and corrosion.",
        "content": "11 * t (where t is the minimum thickness) or 150mm.",
        "clause": "6.2.2.5"
    },
    "T.32": {
        "title": "Table 32 - Minimum pitch and gauge",
        "description": "Validates minimum bolt spacing.",
        "content": "Minimum centre-to-centre distance = 2.5 * d",
        "clause": "6.2.2.2"
    },
    "T.33": {
        "title": "Table 33 - Maximum pitch and gauge",
        "description": "Validates maximum bolt spacing.",
        "content": "Maximum distance = 14 * t (where t is the minimum thickness)",
        "clause": "6.2.2.3"
    },
    "T.34": {
        "title": "Table 34 - Values of bolt shear strength, bearing strength and tension strength",
        "description": "Gets ultimate sheer capacity based on grade.",
        "content": [
            {"grade": "4.6", "shear_strength": "160 N/mm2", "bearing": "460 N/mm2"},
            {"grade": "8.8", "shear_strength": "375 N/mm2", "bearing": "1000 N/mm2"}
        ],
        "clause": "6.3.2"
    }
}
