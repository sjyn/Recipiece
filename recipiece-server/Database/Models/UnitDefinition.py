from typing import TypedDict, Literal


class UnitDefinition(TypedDict, total=False):
    abbr: str
    full: str
    measureType: Literal['volume', 'weight']
