FROM prom/prometheus

# Copying the configuration file
COPY prometheus.yml /etc/prometheus/prometheus.yml

# Exposing Prometheus server port
EXPOSE 9090

# Running Prometheus
ENTRYPOINT [ "prometheus", "--config.file=/etc/prometheus/prometheus.yml" ]