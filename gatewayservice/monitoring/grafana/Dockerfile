FROM grafana/grafana

# Copying the provisioning files
COPY ./provisioning /etc/grafana/provisioning

# Exposing Grafana server port
EXPOSE 9091

# Running Grafana server
CMD [ "grafana-server" ]