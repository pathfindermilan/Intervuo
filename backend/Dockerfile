FROM python:3.12
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv
ENV PYTHONUNBUFFERED=1
WORKDIR /backend

RUN apt update \
    && apt install python3-dev default-libmysqlclient-dev gcc curl -y

COPY pyproject.toml uv.lock /backend/
RUN uv sync --frozen

ENV PATH="/backend/.venv/bin:$PATH"

COPY . /backend/

RUN chmod +x docker-entrypoint.sh
RUN chmod +x wait-for-it.sh
EXPOSE 8001
