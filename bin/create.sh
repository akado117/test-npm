# this should only be ran via npm scripts

parent_path="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"

create_package_json() {
    echo $parent_path

    node $parent_path/js/merge_and_create_package_json.js --directory $1
}

for assets_dir in apps/*/assets; do
    echo "===> $assets_dir"
    (create_package_json $assets_dir)
done


