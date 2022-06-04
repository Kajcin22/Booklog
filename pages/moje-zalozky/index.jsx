import Bookmark from '../../components/Bookmark/bookmark';

export default function Home() {
  return (
    <>
      <div className="container">
        <div>
          <Bookmark
            pageNum={645}
            dateCreated={'03. 06. 2022'}
            bookTitle={'Duna'}
          />
          <Bookmark
            pageNum={128}
            dateCreated={'04. 06. 2022'}
            bookTitle={'Harry Potter a tajemná komnata'}
          />
          <Bookmark
            pageNum={36}
            dateCreated={'01. 06. 2022'}
            bookTitle={'Válka s mloky'}
          />
          <Bookmark
            pageNum={89}
            dateCreated={'2. 06. 2022'}
            bookTitle={'Máj'}
          />
        </div>
      </div>
    </>
  );
}
