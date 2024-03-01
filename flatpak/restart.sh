#!/bin/sh

flatpak kill io.github.fm_elpac.pmim_ibus

systemctl --user restart org.freedesktop.IBus.session.GNOME
