scp -i ~/Desktop/ssh/mac.pem -r ./dist ubuntu@ec2-13-229-128-229.ap-southeast-1.compute.amazonaws.com:~/osha/ui

pm2 start ~/osha/ui/dist/server.js --name ssr.angular