from fastapi import FastAPI
from app.routers import subject, case

app = FastAPI()

app.include_router(subject.router, prefix="/subjects")
app.include_router(case.router, prefix="/cases")

@app.get("/")
def root():
    return {"message": "FastAPI running"}