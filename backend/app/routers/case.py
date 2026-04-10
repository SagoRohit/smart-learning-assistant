from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.config.database import SessionLocal
from app.models.models import Case, CaseStep

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def get_cases(subject_id: int = None, db: Session = Depends(get_db)):
    query = db.query(Case)

    if subject_id:
        query = query.filter(Case.subject_id == subject_id)

    return query.all()


@router.get("/{case_id}")
def get_case(case_id: int, db: Session = Depends(get_db)):
    case = db.query(Case).filter(Case.id == case_id).first()
    steps = db.query(CaseStep).filter(CaseStep.case_id == case_id).order_by(CaseStep.step_number).all()

    return {
        "case": case,
        "steps": steps
    }