from Environment import Environment, DevEnv

if __name__ == '__main__':
    Environment.Environment.setEnv(DevEnv.DevEnv())
    from Main.App import app
    app.run(host='0.0.0.0', port='8080', debug=True)
