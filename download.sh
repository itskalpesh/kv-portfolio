#!/bin/bash
zip -r project.zip . -x "*/node_modules/*" "*/.git/*" "*/dist/*" "*/.next/*" "*.zip"
