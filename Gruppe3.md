{
  "groupNumber": "36",
  "prefix": "Eli"
}

curl -X 'POST' \
  'https://swafe24fitness.azurewebsites.net/api/Group' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer {   "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiTWFuYWdlciIsIlJvbGUiOiJNYW5hZ2VyIiwiVXNlcklkIjoiNzEiLCJHcm91cElkIjoiODMzMGVlM2ItYzM1Yy00MzIzLWIxZDItZTJhN2M0ZjQ3NGNiIiwibmJmIjoiMTczMzIzMjYyMyIsImV4cCI6IjE3MzMzMTkwMjMifQ.dsEFahlWOTDpmk_QNSJe5mbN6s6MuYZfrQlCq8gJ34U" }' \
  -H 'Content-Type: application/json' \
  -d '{
  "groupNumber": "36",
  "prefix": "Eli"
}'


for manager login: 
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiTWFuYWdlciIsIlJvbGUiOiJNYW5hZ2VyIiwiVXNlcklkIjoiMzg3IiwiR3JvdXBJZCI6IjhhMzgwODRjLTJmMjctNDlkMS1iMDYyLTNhNzAxYTU2OGI1NSIsIm5iZiI6IjE3MzMyMzMwNzgiLCJleHAiOiIxNzMzMzE5NDc4In0.eMA6f9UkFWJi21y1nfBpXVHkb9eGfInlzj7m3By1wY8"
}

curl -X 'POST' \
  'https://swafe24fitness.azurewebsites.net/api/Users/login' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiTWFuYWdlciIsIlJvbGUiOiJNYW5hZ2VyIiwiVXNlcklkIjoiNzEiLCJHcm91cElkIjoiODMzMGVlM2ItYzM1Yy00MzIzLWIxZDItZTJhN2M0ZjQ3NGNiIiwibmJmIjoiMTczMzIzMjYyMyIsImV4cCI6IjE3MzMzMTkwMjMifQ.dsEFahlWOTDpmk_QNSJe5mbN6s6MuYZfrQlCq8gJ34U" ' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "eli_boss@fitness.dk",
  "password": "asdfQWER"
}'