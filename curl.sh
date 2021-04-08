curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"user_name":"root", "password": "pass"}' \
  -v \
  http://$1:5000/user/login
