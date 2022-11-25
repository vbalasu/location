export AWS_PROFILE=vbalasu_admin
aws s3 cp --recursive --acl public-read output/ s3://cloudmatica-public/location/
