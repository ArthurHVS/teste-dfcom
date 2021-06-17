import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { Button, Paper, Grid } from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(4),
    margin: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
}));

const Produto = ({ body, productIndex }) => {
  const styles = useStyles();

  const [favorite, setFavorite] = useState(useSelector(state => state.myFavs !== [] ? state.myFavs[productIndex] : false));
  let logged = useSelector(state => state.isLogged);
  let myFavs = useSelector(state => state.myFavs);
  let currentUser = useSelector(state => state.userId);


  useEffect(() => {
      setFavorite(myFavs[productIndex] ? myFavs[productIndex] : false);
  }, [myFavs]);

  function favMe() {
    for(let index = 0; index <= productIndex; index++) {
      if (index === productIndex) {
        myFavs[productIndex] = !myFavs[productIndex];
      }
      else if (myFavs[index] === undefined) {
        myFavs[index] = false;
      }
    }

    return fetch('http://localhost:8080/favme',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({myFavs: myFavs, userId:currentUser})
      })
      .then(setFavorite(!favorite))
  }
  return (
    <div className={styles.root}>
      {body.map(produtos => {
        const { productId, nome, preco, descricao } = produtos;
        return (
          <Grid item xs={12} key={productId}>
            <Paper className={styles.paper}>
              <h1>{nome}</h1>{!logged ? <></> : <Button onClick={favMe}>{favorite ? <StarIcon /> : <StarBorderIcon />}</Button>}
              <p>R$ {preco}</p>
              <p>{descricao}</p>
            </Paper>
          </Grid>
        );
      })}
    </div>
  );
};

export default Produto