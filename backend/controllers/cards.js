const mongoose = require('mongoose');
const Card = require('../models/card');

const { SUCCESS_RES } = require('../utils/response-status');
const NotFoundError = require('../utils/NotFoundError');
const BadRequestError = require('../utils/BadRequestError');
const ForbiddenError = require('../utils/ForbiddenError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(SUCCESS_RES).send(card))
    .catch((err) => {
      if (err.name instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Некорректные данные.'));
      } else {
        next(err);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((error) => next(error));
};

module.exports.deleteCard = (req, res, next) => {
  // const { cardId } = req.params;
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card not found');
      }
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError('Невозможно удалить чужую карточку.');
      } else {
        Card.findByIdAndDelete(req.params.cardId)
          .orFail(() => new NotFoundError('Card not found'))
          .then(() => res.status(200).send({ message: 'Карточка удалена.' }))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Переданы некорректные данные карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        next(new NotFoundError('Card not found'));
      }
    })
    .catch((err) => {
      if (err.name instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Переданы некорректные данные карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        next(new NotFoundError('Card not found'));
      }
    })
    .catch((err) => {
      if (err.name instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Переданы некорректные данные карточки'));
      } else {
        next(err);
      }
    });
};
