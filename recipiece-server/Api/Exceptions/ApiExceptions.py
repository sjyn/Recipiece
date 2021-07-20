class BaseApiException(Exception):
    def __init__(self, errorCode: int, message: str = None):
        self.errorCode = errorCode
        self.message = message or 'Unknown Error'


class ConflictException(BaseApiException):
    def __init__(self):
        super().__init__(409, 'Entity already exists')


class BadRequestException(BaseApiException):
    def __init__(self):
        super().__init__(400, 'Bad Request')


class NotFoundException(BaseApiException):
    def __init__(self):
        super().__init__(404, 'Entity not found')


class ForbiddenException(BaseApiException):
    def __init__(self):
        super().__init__(403, 'Access Denied')


class UnauthorizedException(BaseApiException):
    def __init__(self):
        super().__init__(401, 'Unauthorized')


class UnprocessableEntityException(BaseApiException):
    def __init__(self):
        super().__init__(422, 'Cannot process request')
