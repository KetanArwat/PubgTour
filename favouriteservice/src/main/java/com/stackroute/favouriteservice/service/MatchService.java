package com.stackroute.favouriteservice.service;

import java.util.List;

import com.stackroute.favouriteservice.exception.MatchAlreadyExistsException;
import com.stackroute.favouriteservice.exception.MatchNotFoundException;
import com.stackroute.favouriteservice.model.Match;

public interface MatchService {

	boolean saveMatch(Match match) throws MatchAlreadyExistsException;

	boolean deleteMovieById(int mId) throws MatchNotFoundException;

	List<Match> getAllMatches(String userId);

	Match getMoviebyIdAndUser(String id, String userId);

	Match updateMatch(Match match) throws MatchNotFoundException;

	Match getMatchById(int Id) throws MatchNotFoundException;

}
