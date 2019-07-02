defmodule ChatApp.RoomChannel do
  use ChatApp.Web, :channel
  alias ChatApp.Presence

  def join("room:lobby", _, socket) do
    send self(), :after_join
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
      Presence.track(socket, socket.assigns.user, %{
      online_at: :os.system_time(:milli_seconds)
    })
    push socket, "presence_state", Presence.list(socket)
    {:noreply, socket}
  end

  def handle_in("message:new", msg, socket) do
    broadcast! socket, "message:new", %{
      user: socket.assigns.user,
      body: msg,
      timestamp: :os.system_time(:milli_seconds)
    }
    {:noreply, socket}
  end

end
