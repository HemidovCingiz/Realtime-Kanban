from datetime import datetime
from typing import Optional
from enum import Enum
from sqlmodel import SQLModel, Field

class TaskStatus(str, Enum):
    TODO = "todo"
    IN_PROGRESS = "in_progress"
    DONE = "done"


class Task(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    description: Optional[str] = None
    status: TaskStatus = Field(default=TaskStatus.TODO)
    created_at: datetime = Field(default_factory=datetime.utcnow)


class TaskCreate(SQLModel):
    title: str
    description: Optional[str] = None
    status: Optional[TaskStatus] = TaskStatus.TODO

class TaskUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TaskStatus] = None