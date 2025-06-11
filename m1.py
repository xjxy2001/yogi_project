import requests
import pandas as pd
from datetime import datetime, timedelta
import json
import os
from dotenv import load_dotenv
from urllib.parse import urlencode

load_dotenv()
USERNAME = "AO_MUMBAI"
PASSWORD = "Pass@123"

if not USERNAME or not PASSWORD:
    raise Exception("Missing EP_USERNAME or EP_PASSWORD in .env file")

TOKEN_URL = "https://mahaparwanaapi.mahaitgov.in/token"
DATA_URL = "http://mahaparwanaapi.mahaitgov.in/api/MahaParwanaMergeApi/GetMergingApiDetails"

yesterday = datetime.now() - timedelta(days=1)
yesterday_str = yesterday.strftime("%Y-%m-%d")

auth_data = {
    "username": USERNAME,
    "password": PASSWORD,
    "grant_type": "password"
}

auth_headers = {
    "Content-Type": "application/x-www-form-urlencoded"
}

encoded_data = urlencode(auth_data)

print("Requesting token...")
token_response = requests.post(TOKEN_URL, data=encoded_data, headers=auth_headers)

if token_response.status_code != 200:
    raise Exception(f"Failed to get token: {token_response.status_code} {token_response.text}")

access_token = token_response.json().get("access_token")
if not access_token:
    raise Exception("Token not found in response")

headers = {
    "Authorization": f"Bearer {access_token}"
}

params = {
    "fromDate": yesterday_str,
    "ToDate": yesterday_str,
    "pgNumber": 1,
    "pgSize": 1000
}

print(f"Fetching data for: {yesterday_str}")
response = requests.get(DATA_URL, headers=headers, params=params)

if response.status_code != 200:
    raise Exception(f"Failed to fetch data: {response.status_code} {response.text}")

try:
    outer_json = response.json()
    if isinstance(outer_json, str):
        json_objects = []
        current_pos = 0
        while current_pos < len(outer_json):
            try:
                obj, end = json.JSONDecoder().raw_decode(outer_json[current_pos:])
                json_objects.append(obj)
                current_pos += end
            except json.JSONDecodeError:
                next_pos = outer_json.find('{"AppIdDetailsList"', current_pos + 1)
                if next_pos == -1:
                    break
                current_pos = next_pos

        if json_objects:
            data = {
                "AppIdDetailsList": [],
                "PersonDetailsList": [],
                "FirmDetailsList": [],
                "SalesOfficeDetailsList": [],
                "StorageDetailsList": [],
                "FertilizerDetailsList": [],
                "SeedDetailsList": [],
                "InsecticideDetailsList": [],
                "ServicesDetailsList": [],
                "BusinessAreaDetailsList": [],
                "ApplicationDetailsList": [],
                "LicenseDetailsList": [],
                "DateRecordDetailsList": [],
                "ReuesterDetailsList": [],
                "ScrutinyDetailsList": [],
            }
            for obj in json_objects:
                for key in data.keys():
                    if key in obj:
                        data[key].extend(obj[key])
        else:
            raise Exception("No valid JSON objects found in response")
    else:
        data = outer_json
except json.JSONDecodeError as e:
    with open(f"raw_response_{yesterday_str}.txt", "w", encoding='utf-8') as f:
        f.write(response.text)
    raise Exception("API returned invalid JSON.")

expected_keys = [
    "AppIdDetailsList", "PersonDetailsList", "FirmDetailsList",
    "SalesOfficeDetailsList", "StorageDetailsList", "FertilizerDetailsList",
    "SeedDetailsList", "InsecticideDetailsList", "ServicesDetailsList",
    "BusinessAreaDetailsList", "ApplicationDetailsList", "LicenseDetailsList",
    "DateRecordDetailsList", "RequesterDetailsList", "ScrutinyDetailsList"
]

for key in expected_keys:
    if key not in data:
        data[key] = []

excel_filename = f"Merged_Data_{yesterday_str}.xlsx"
with pd.ExcelWriter(excel_filename, engine='openpyxl') as writer:
    for key, val in data.items():
        if isinstance(val, list):
            if not val:
                val = [{}]
            df = pd.DataFrame(val)
            df.to_excel(writer, sheet_name=key, index=False)
            print(f"Sheet created for {key} with {len(val)} records.")
print(f"Excel file saved: {excel_filename}")