import ImagesSlider from './ImagesSlider'
import MovieInformationCard from './MovieInformationCard'

const CastOverviewContent = ({ actorInfo }) => {
    return `
        ${ImagesSlider({
            images: actorInfo.actorImages,
            classNames: ['pad-no']
        })}
            <div class="actor-info color-white">
                <p class="actor-info__name">${actorInfo.actorName}</p>
                <p class="actor-info__nationality color-gray">${
                    actorInfo.actorNationality
                }</p>
            </div>
            <div class="card">
                <p>
                    Proident sunt voluptate pariatur exercitation reprehenderit dolor excepteur. 
                    Reprehenderit sint consectetur deserunt velit labore proident. 
                    Veniam sint cillum voluptate veniam sint veniam consectetur aute laborum. 
                    Est laborum duis pariatur excepteur eiusmod labore magna minim.
                </p>
                <hr/>
                <p>
                    Proident sunt voluptate pariatur exercitation reprehenderit dolor excepteur. 
                    Reprehenderit sint consectetur deserunt velit labore proident. 
                    Veniam sint cillum voluptate veniam sint veniam consectetur aute laborum. 
                    Est laborum duis pariatur excepteur eiusmod labore magna minim.
                </p>
                <br/>
                <p>
                    Proident sunt voluptate pariatur exercitation reprehenderit dolor excepteur. 
                    Reprehenderit sint consectetur deserunt velit labore proident. 
                    Veniam sint cillum voluptate veniam sint veniam consectetur aute laborum. 
                    Est laborum duis pariatur excepteur eiusmod labore magna minim.
                </p>
                <p>
                    Proident sunt voluptate pariatur exercitation reprehenderit dolor excepteur. 
                    Reprehenderit sint consectetur deserunt velit labore proident. 
                    Veniam sint cillum voluptate veniam sint veniam consectetur aute laborum. 
                    Est laborum duis pariatur excepteur eiusmod labore magna minim.
                </p>
                <br/>
                <p>
                    Proident sunt voluptate pariatur exercitation reprehenderit dolor excepteur. 
                    Reprehenderit sint consectetur deserunt velit labore proident. 
                    Veniam sint cillum voluptate veniam sint veniam consectetur aute laborum. 
                    Est laborum duis pariatur excepteur eiusmod labore magna minim.
                </p>
            </div>
        `
}

export default CastOverviewContent
