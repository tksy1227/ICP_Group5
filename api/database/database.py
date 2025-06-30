from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/postgres"

engine = create_engine(DATABASE_URL,
    pool_size=10,            # Number of DB connections in pool
    max_overflow=5,          # Extra connections allowed when pool is full
    pool_timeout=30,         # Seconds to wait for a connection
    pool_recycle=1800        # Close connections after this many seconds
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()