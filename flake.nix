{
  description = "Dev shell with PHP 8.4 and Node.js LTS";

  inputs = {
    # Stable nixpkgs for Node.js LTS
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";

    # Unstable nixpkgs for PHP 8.4
    unstable.url = "github:NixOS/nixpkgs/nixos-unstable";

    # Flake utility for devShell
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, unstable, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };

        unstablePkgs = import unstable {
          inherit system;
        };

        php = unstablePkgs.php84;
        nodejs = pkgs.nodejs_lts;
      in {
        devShells.default = pkgs.mkShell {
          buildInputs = [
            php
            nodejs
          ];

          shellHook = ''
            echo "PHP version: $(php -v | head -n 1)"
            echo "Node.js version: $(node -v)"
            echo "npm version: $(npm -v)"
          '';
        };
      });
}

