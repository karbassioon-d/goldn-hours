from pydantic import BaseModel
from typing import Optional
from .pydantic_object import PydanticObjectId


class AccountIn(BaseModel):
    email: str
    password: str
    username: str
    profile_pic: Optional[str]
    name: str
    is_admin: Optional[bool] = False


class Account(AccountIn):
    id: PydanticObjectId


class AccountOut(AccountIn):
    id: str
