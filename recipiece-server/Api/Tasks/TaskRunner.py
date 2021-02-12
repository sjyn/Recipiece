import threading


class TaskRunner:
    @classmethod
    def runTask(cls, runner, *args, **kwargs) -> threading.Thread:
        thread = threading.Thread(target=runner, args=args, kwargs=kwargs)
        thread.start()
        return thread
