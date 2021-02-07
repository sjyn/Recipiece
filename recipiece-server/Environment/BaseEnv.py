class BaseEnv:
    @property
    def DB_USER(self) -> str:
        raise NotImplementedError()

    @property
    def DB_NAME(self) -> str:
        raise NotImplementedError()

    @property
    def DB_PASSWORD(self) -> str:
        raise NotImplementedError()

    @property
    def DB_PORT(self) -> int:
        raise NotImplementedError()

    @property
    def DB_HOST(self) -> str:
        raise NotImplementedError()
