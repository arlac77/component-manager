
pre_install() {
	useradd -U -l -M -r -s /usr/bin/nologin -d /var/lib/component-manager -c "manages components and its dependencies" component-manager
}

post_install() {
	systemctl daemon-reload
	systemctl enable component-manager
	systemctl enable component-manager.socket
	systemctl start component-manager.socket
}

pre_upgrade() {
	systemctl stop component-manager.socket
	systemctl stop component-manager
}

post_upgrade() {
	systemctl daemon-reload
	systemctl start component-manager.socket
}

pre_remove() {
	systemctl stop component-manager.socket
	systemctl disable component-manager.socket
	systemctl stop component-manager
	systemctl disable component-manager
}

post_remove() {
	systemctl daemon-reload
	userdel component-manager
	groupdel component-manager
}
