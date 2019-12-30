# this should only be ran via npm scripts

create_package_json() {
    node ./js/merge_and_create_package_json.js --directory $1
}

for assets_dir in apps/*/assets; do
    echo "===> $assets_dir"
    create_package_json $assets_dir
done


