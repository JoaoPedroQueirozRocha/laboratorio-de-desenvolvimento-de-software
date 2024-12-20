package com.example.project_2.model.mapper;

import com.example.project_2.Enums.VehicleStatus;
import com.example.project_2.model.User;
import com.example.project_2.model.Vehicle;
import com.example.project_2.model.DTO.UserDTO;
import com.example.project_2.model.DTO.VehicleDTO;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Component
public class UserMapper implements RowMapper<UserDTO> {

    public static RowMapper<UserDTO> userRowMapper() {
        return new UserMapper();
    }

    @Override
    public UserDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
        UserDTO user = new UserDTO();
        user.setId(rs.getLong("id"));
        user.setName(rs.getString("name"));
        user.setEmail(rs.getString("email"));
        user.setUserToken(rs.getString("user_token"));
        user.setRole(rs.getString("role"));
        return user;
    }

    public static RowMapper<UserDTO> userWithVehiclesMapper() {
        return new RowMapper<UserDTO>() {
            private UserDTO currentUser = null;

            @Override
            public UserDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
                Long userId = rs.getLong("id");

                if (currentUser == null || currentUser.getId() != userId) {
                    currentUser = new UserDTO();
                    currentUser.setId(userId);
                    currentUser.setName(rs.getString("name"));
                    currentUser.setEmail(rs.getString("email"));
                    currentUser.setUserToken(rs.getString("user_token"));
                    currentUser.setRole(rs.getString("role"));
                }
                return currentUser;
            }
        };
    }

}
