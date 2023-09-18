FROM python:3.9-alpine

#installs dependencies
RUN pip install --upgrade pip
COPY ./api/requirements.txt /var/tmp/requirements.txt
RUN pip install -r /var/tmp/requirements.txt
