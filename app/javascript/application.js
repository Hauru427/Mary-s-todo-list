import { Turbo } from "@hotwired/turbo-rails"
import "bootstrap";
import "./react/entrypoints/todo_app";

Turbo.session.drive = false
