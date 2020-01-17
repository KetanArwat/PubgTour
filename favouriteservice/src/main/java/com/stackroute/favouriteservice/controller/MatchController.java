package com.stackroute.favouriteservice.controller;

import java.util.List;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.favouriteservice.exception.MatchAlreadyExistsException;
import com.stackroute.favouriteservice.exception.MatchNotFoundException;
import com.stackroute.favouriteservice.model.Match;
import com.stackroute.favouriteservice.service.MatchService;

import io.jsonwebtoken.Jwts;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/v1/matchservice")
public class MatchController {

	@Autowired
	private MatchService matchService;

	@PostMapping("/match")
	public ResponseEntity<?> saveNewMatch(@RequestBody final Match match, HttpServletRequest request,
			HttpServletRequest response) {
		System.out.println("saving match");
		final String authHeader = request.getHeader("authorization");
		final String token = authHeader.substring(7);
		String userId = Jwts.parser().setSigningKey("secretkey").parseClaimsJws(token).getBody().getSubject();
		System.out.println("userId::" + userId);
		ResponseEntity<?> responseEntity;
		try {
			match.setUserId(userId);
			matchService.saveMatch(match);
			responseEntity = new ResponseEntity<Match>(match, HttpStatus.CREATED);

		} catch (MatchAlreadyExistsException e) {
			responseEntity = new ResponseEntity<String>("{ \"message\": \"" + e.getMessage() + "\"}",
					HttpStatus.CONFLICT);
		}
		return responseEntity;
	}

	@DeleteMapping(path = "/{id}/{userId}")
	public ResponseEntity<?> deleteMatchById(@PathVariable("id") final String id,
			@PathVariable("userId") final String userId) {
		ResponseEntity<?> responseEntity;
		Match match = matchService.getMoviebyIdAndUser(id, userId);
		try {
			matchService.deleteMovieById(match.getmId());
		} catch (MatchNotFoundException e) {
			responseEntity = new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
		responseEntity = new ResponseEntity<String>("movie deleted successfully", HttpStatus.OK);
		return responseEntity;

	}

	@GetMapping("/matches")
	public @ResponseBody ResponseEntity<List<Match>> fetchAllMatches(final ServletRequest req,
			final ServletResponse res) {
		final HttpServletRequest request = (HttpServletRequest) req;
		final String authHeader = request.getHeader("authorization");
		final String token = authHeader.substring(7);
		String userId = Jwts.parser().setSigningKey("secretkey").parseClaimsJws(token).getBody().getSubject();
		System.out.println("userId::" + userId);
		return new ResponseEntity<List<Match>>(matchService.getAllMatches(userId), HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateMatch(@PathVariable("id") final int id, @RequestBody final Match Match) {
		ResponseEntity<?> responseEntity;
		try {
			final Match fetchedMatch = matchService.updateMatch(Match);

			responseEntity = new ResponseEntity<Match>(fetchedMatch, HttpStatus.OK);

		} catch (MatchNotFoundException e) {

			responseEntity = new ResponseEntity<String>("message: " + e.getMessage(), HttpStatus.CONFLICT);
		}
		return responseEntity;
	}

	@GetMapping(path = "/{id}")
	public ResponseEntity<?> fetchedMatchById(@PathVariable("id") final int id) {
		ResponseEntity<?> responseEntity;
		try {
			final Match fetchedMatch = matchService.getMatchById(id);

			responseEntity = new ResponseEntity<Match>(fetchedMatch, HttpStatus.OK);

		} catch (MatchNotFoundException e) {

			responseEntity = new ResponseEntity<String>("message: " + e.getMessage(), HttpStatus.NOT_FOUND);
		}
		return responseEntity;
	}
}