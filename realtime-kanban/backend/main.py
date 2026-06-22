from fastapi import FastAPI, Depends, HTTPException, status
from typing import List
from sqlmodel import Session
from database import init_db, get_session
from models import Task, TaskCreate, TaskUpdate
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware 
from typing import List
from sqlmodel import Session
from database import init_db, get_session
from models import Task, TaskCreate, TaskUpdate

app = FastAPI(title="Real-Time Kanban API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()


app = FastAPI(title="Real-Time Kanban API")

@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/")
def read_root():
    return {"status": "success", "message": "Kanban Backend API is running successfully!"}

@app.post("/tasks", response_model=Task, status_code=status.HTTP_201_CREATED)
def create_task(task_input: TaskCreate, session: Session = Depends(get_session)):
    db_task = Task.from_orm(task_input)
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task


@app.get("/tasks", response_model=List[Task])
def get_tasks(session: Session = Depends(get_session)):
    tasks = session.query(Task).all()
    return tasks


@app.put("/tasks/{id}", response_model=Task)
def update_task(id: int, task_input: TaskUpdate, session: Session = Depends(get_session)):
    db_task = session.get(Task, id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    
    task_data = task_input.dict(exclude_unset=True)
    for key, value in task_data.items():
        setattr(db_task, key, value)
        
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task


@app.delete("/tasks/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(id: int, session: Session = Depends(get_session)):
    db_task = session.get(Task, id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    session.delete(db_task)
    session.commit()
    return None