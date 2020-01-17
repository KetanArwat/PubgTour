package com.stackroute.favouriteservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.favouriteservice.exception.MatchAlreadyExistsException;
import com.stackroute.favouriteservice.exception.MatchNotFoundException;
import com.stackroute.favouriteservice.model.Match;
import com.stackroute.favouriteservice.repository.MatchRepository;

@Service
public class MatchServiceImplementation implements MatchService {

	@Autowired
	private transient MatchRepository matchRepository;

	@Override
	public boolean saveMatch(Match match) throws MatchAlreadyExistsException {
		final Optional<Match> object = matchRepository.findById(match.getmId());
		if (object.isPresent()) {
			throw new MatchAlreadyExistsException("Could not save match, Match already present");
		}
		matchRepository.save(match);
		return true;
	}

	@Override
	public boolean deleteMovieById(int mId) throws MatchNotFoundException {
		final Match match = matchRepository.findById(mId).orElse(null);
		if (match == null) {
			throw new MatchNotFoundException("Could not delete, Movie not found!");
		}
		matchRepository.delete(match);
		return true;
	}

	@Override
	public List<Match> getAllMatches(String userId) {
		return matchRepository.findByUserId(userId);

	}

	@Override
	public Match getMoviebyIdAndUser(String id, String userId) {
		return matchRepository.findByIdAndUserId(id, userId);

	}

	@Override
	public Match updateMatch(final Match updateMatch) throws MatchNotFoundException {
		// TODO Auto-generated method stub
		final Match match = matchRepository.findById(updateMatch.getmId()).orElse(null);

		if (match == null) {
			throw new MatchNotFoundException("Couldn't update Match . Match not found");
		}
		match.setMapName(updateMatch.getMapName());
		matchRepository.save(match);
		return match;
	}

	@Override
	public Match getMatchById(int id) throws MatchNotFoundException {
		// TODO Auto-generated method stub
		final Match Match = matchRepository.findById(id).orElse(null);
		if (Match == null) {
			throw new MatchNotFoundException("Match could not be found");
		}

		return Match;
	}

}
