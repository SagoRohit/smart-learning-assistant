from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Text
from app.config.database import Base

class Subject(Base):
    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)


class Case(Base):
    __tablename__ = "cases"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    subject_id = Column(Integer, ForeignKey("subjects.id"))
    difficulty = Column(String)


class CaseStep(Base):
    __tablename__ = "case_steps"

    id = Column(Integer, primary_key=True, index=True)
    case_id = Column(Integer, ForeignKey("cases.id"))
    step_number = Column(Integer)
    content = Column(Text)
    correct_answer = Column(Text)