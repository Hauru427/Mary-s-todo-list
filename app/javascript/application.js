import { Turbo } from "@hotwired/turbo-rails"
import "bootstrap";
import "./react/entrypoints/todo_app";
import $ from 'jquery';

Turbo.session.drive = false
