# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :chat_app,
  ecto_repos: [ChatApp.Repo]

# Configures the endpoint
config :chat_app, ChatApp.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "YEqiNRMQcJ6JYB3hN8wXjqaUr6U1h/LCHKNqPl3IMFfj4CdkUkZbUNWbr05ONqy2",
  render_errors: [view: ChatApp.ErrorView, accepts: ~w(html json)],
  pubsub: [name: ChatApp.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
