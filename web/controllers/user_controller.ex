defmodule ChatApp.UserController do
  use ChatApp.Web, :controller
  alias ChatApp.Repo
  alias ChatApp.User

  def index(conn, _params) do
    users = Repo.all(User)
    render(conn, "index.html", users: users)
  end
end
