
function headData(title:string, description:string, image:string):any{
    return {title,description,image};
}

function breadcrumbData(links){
    const linksObject = links.map(link => 
        ({
            link:link[0],
            name:link[1]
        })
    )
    return linksObject;
}

export { headData,breadcrumbData };