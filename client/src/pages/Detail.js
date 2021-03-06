import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../css/Detail.css";
import Actor from "../components/Actor";
import ActorProfile from "../components/ActorProfile";
import Movie from "../components/Movie";
import axios from "axios";
export default function Detail({ isLogin }) {
  const { id } = useParams();
  const [isActor, setIsActor] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/actor/${id}`)
      .then((res) => {
        const data = res.data.actorDetail;
        setIsActor(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div id="detail-container">
      <section className="detail-actor">
        <div className="detail-actor-about">
          <Actor isLogin={isLogin} actor={isActor} />
          <ActorProfile actor={isActor} />
        </div>
        <div className="detail-actor-movie">
          <h2>출연작</h2>
          <div className="detail-actor-movies">
            {isActor &&
              isActor?.actor_movies.map((actor_movie) => (
                <Movie key={actor_movie.id} movie={actor_movie.movie} />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
